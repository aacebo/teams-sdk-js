import { useContext, useEffect } from 'react';
import { ClientContext } from '../../client';
import './Activities.css';

export default function Activities() {
  const client = useContext(ClientContext);

  useEffect(() => {
    client.on('activity.receive', value => console.log(value));
    client.on('activity.send', value => console.log(value));

    return () => {
      client.off('activity.receive');
      client.off('activity.send');
    };
  }, []);

  return (
    <div className="Activities">Activities...</div>
  );
}
