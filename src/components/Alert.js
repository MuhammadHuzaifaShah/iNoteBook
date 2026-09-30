export default function Alert({ alert }) {
  return <div className="toast-region" aria-live="polite" aria-atomic="true">{alert && <div className={`toast toast-${alert.type}`} role={alert.type === 'danger' ? 'alert' : 'status'}>{alert.msg}</div>}</div>;
}
