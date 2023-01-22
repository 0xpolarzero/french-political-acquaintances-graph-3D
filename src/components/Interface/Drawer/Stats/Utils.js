import { useEffect, useState } from 'react';

const ErrorComponent = ({ data }) => {
  const [missingData, setMissingData] = useState([]);
  console.log('ErrorComponent', data);

  useEffect(() => {
    if (!data || data.length) return;

    // Detect errors
    let status = {};
    data.map((item) => (status[item.type] = isNaN(item.A) || isNaN(item.B)));

    // If it's errored, add the key to the errors array
    const errors = Object.keys(status).reduce((acc, key) => {
      if (status[key]) acc.push(key);
      return acc;
    }, []);

    if (errors.length) setMissingData(errors);
  }, [data]);

  if (!missingData.length) return null;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <p className='error' style={{ textAlign: 'center' }}>
        Certaines données sont manquantes pour ce.tte député.e:
      </p>
      <p className='error' style={{ textAlign: 'center', fontWeight: 400 }}>
        {missingData.join(' - ')}
      </p>
    </div>
  );
};

export { ErrorComponent };
