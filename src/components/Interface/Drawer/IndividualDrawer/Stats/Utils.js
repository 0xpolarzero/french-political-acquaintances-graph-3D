import { useEffect, useState } from 'react';

const ErrorComponent = ({ data }) => {
  const [missingData, setMissingData] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    // Detect errors
    let status = {};
    Object.keys(data).forEach((key) => {
      status[data[key].type] = isNaN(data[key].value);
    });
    // If it's errored, add the key to the errors array
    const errors = Object.keys(status).reduce((acc, key) => {
      if (status[key]) acc.push(key);
      return acc;
    }, []);

    console.log('errors', errors);

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
