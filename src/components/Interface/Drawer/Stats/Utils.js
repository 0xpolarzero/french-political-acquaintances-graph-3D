import { useEffect, useState } from 'react';

const ErrorComponent = ({ data }) => {
  const [missingData, setMissingData] = useState([]);

  useEffect(() => {
    if (!data || !data.length) return;

    let errors = data.map((d) => {
      if (isNaN(d.A) || isNaN(d.B)) return d.type;
      return null;
    });
    errors = errors.filter((e) => e);

    if (errors.length) setMissingData(errors);
  }, [data]);

  if (!missingData.length) return null;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <p className='error' style={{ textAlign: 'center' }}>
        Certaines données sont manquantes:
      </p>
      <p className='error' style={{ textAlign: 'center', fontWeight: 400 }}>
        {missingData.join(' - ')}
      </p>
    </div>
  );
};

export { ErrorComponent };
