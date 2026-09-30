import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { request } from './api';
jest.mock('./api', () => ({ apiAvailable: true, request: jest.fn() }));
beforeEach(() => { localStorage.clear(); window.history.replaceState({}, '', '/'); request.mockReset(); });

test('login, create, tags, search, edit, delete confirmation and logout work together', async () => {
  request.mockImplementation(async (path, options) => {
    if (path.startsWith('/auth/')) return { success: true, authToken: 'test-token' };
    if (path.endsWith('/fetchnotes')) return [];
    if (path.endsWith('/addnote')) return { _id: '1', date: '2026-09-30', ...options.body };
    if (path.includes('/updatenote/')) return { note: { _id: '1', date: '2026-09-30', ...options.body } };
    return { Success: 'Deleted' };
  });
  render(<App />);
  userEvent.type(screen.getByLabelText('Email address'), 'test@example.com');
  userEvent.type(screen.getByLabelText('Password'), 'secret');
  userEvent.click(screen.getByRole('button', { name: /Log in/ }));
  await screen.findByText('A fresh page, just for you.');
  userEvent.click(screen.getByRole('button', { name: /New note/ }));
  let editor = screen.getByRole('dialog', { name: 'A new thought.' });
  userEvent.type(within(editor).getByLabelText('Title'), 'Study plan');
  userEvent.type(within(editor).getByLabelText('Your note'), 'Review registers and memory.');
  userEvent.type(within(editor).getByLabelText(/Tag/), 'Study');
  userEvent.click(within(editor).getByRole('button', { name: 'Save note' }));
  await screen.findByRole('heading', { name: 'Study plan' });
  expect(request).toHaveBeenCalledWith('/notes/addnote', expect.objectContaining({ body: { title: 'Study plan', description: 'Review registers and memory.', tags: 'Study' } }));
  userEvent.type(screen.getByRole('searchbox'), 'nothing');
  expect(screen.getByText('No matching notes.')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'Clear filters' }));
  userEvent.click(screen.getByRole('button', { name: 'Edit Study plan' }));
  editor = screen.getByRole('dialog', { name: 'Edit your note' });
  userEvent.clear(within(editor).getByLabelText('Title'));
  userEvent.type(within(editor).getByLabelText('Title'), 'Updated plan');
  userEvent.click(within(editor).getByRole('button', { name: 'Save note' }));
  await screen.findByRole('heading', { name: 'Updated plan' });
  userEvent.click(screen.getByRole('button', { name: 'Delete Updated plan' }));
  userEvent.click(screen.getByRole('button', { name: 'Keep note' }));
  expect(request.mock.calls.some(([path]) => path.includes('deletenote'))).toBe(false);
  userEvent.click(screen.getByRole('button', { name: 'Delete Updated plan' }));
  userEvent.click(screen.getByRole('button', { name: 'Delete note' }));
  await screen.findByText('A fresh page, just for you.');
  userEvent.click(screen.getByRole('button', { name: 'Log out' }));
  await screen.findByRole('heading', { name: 'Welcome back.' });
  expect(localStorage.getItem('token')).toBeNull();
});

test('a failed save preserves the draft and allows retry', async () => {
  localStorage.setItem('token', 'test-token');
  request.mockImplementation(async path => {
    if (path.endsWith('/fetchnotes')) return [];
    throw new Error('Server unavailable. Try again.');
  });
  render(<App />);
  await screen.findByText('A fresh page, just for you.');
  userEvent.click(screen.getByRole('button', { name: /New note/ }));
  const editor = screen.getByRole('dialog', { name: 'A new thought.' });
  userEvent.type(within(editor).getByLabelText('Title'), 'Keep my draft');
  userEvent.type(within(editor).getByLabelText('Your note'), 'This must survive a failed request.');
  userEvent.click(within(editor).getByRole('button', { name: 'Save note' }));
  await screen.findByText('Server unavailable. Try again.');
  expect(within(editor).getByLabelText('Title')).toHaveValue('Keep my draft');
  expect(within(editor).getByRole('button', { name: 'Save note' })).toBeEnabled();
  expect(screen.queryByText('Note saved successfully.')).not.toBeInTheDocument();
});

test('signup rejects mismatched passwords without making an API request', async () => {
  window.history.replaceState({}, '', '/signup');
  render(<App />);
  userEvent.type(screen.getByLabelText('Full name'), 'Test User');
  userEvent.type(screen.getByLabelText('Email address'), 'test@example.com');
  userEvent.type(screen.getByLabelText('Password'), 'secret');
  userEvent.type(screen.getByLabelText('Confirm password'), 'different');
  fireEvent.submit(screen.getByRole('button', { name: /Create account/ }).closest('form'));
  await waitFor(() => expect(screen.getByText('Your passwords do not match.')).toBeInTheDocument());
  expect(request).not.toHaveBeenCalled();
});
