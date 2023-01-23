import { useState } from 'react';
import { Modal } from 'antd';

const AlertModal = ({ type, message }) => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      centered
      zIndex={10000}
      footer={<button onClick={() => setOpen(false)}>OK</button>}
      onCancel={() => setOpen(false)}
    >
      <div className={type} style={{ textAlign: 'center' }}>
        {message}
      </div>
    </Modal>
  );
};

export default AlertModal;
