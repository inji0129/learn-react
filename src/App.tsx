import axios from 'axios';
import { useEffect } from 'react';
import { useCallback, useMemo, useState } from 'react';

// ? https://ko.reactjs.org/docs/getting-started.html
// ? https://react.vlpt.us/

// todo useState, useCallback사용해서 counter 만들기 +1 -1버튼 const [value, setter] = useState(0)
// todo useMemo사용해서 카운터 패널 만들기 count가 10보다 크면 true, 작으면 false, 크면 초록색, 작으면 빨간색\
// todo useEffect, axios 사용해서 https://api64.ipify.org?format=json로 현재 접속한 곳 public ip 보여주기

const Test = () => {
  const [number, setNumber] = useState<number>(0);
  const [publicIp, setPublicIp] = useState('');

  const getPublicIp = useCallback(async () => {
    const response = await axios.get(
      `https://api64.ipify.org?format=json&${number}`,
    );
    setPublicIp(response.data.ip);
  }, [number]);

  useEffect(() => {
    getPublicIp();
  }, [getPublicIp]);

  const onIncrease = useCallback(
    () => setNumber((prevNumber) => prevNumber + 1),
    [],
  );
  const onDecrease = useCallback(
    () => setNumber((prevNumber) => prevNumber - 1),
    [],
  );

  const isCountGreterThan10 = useMemo(() => {
    return number > 10;
  }, [number]);

  return (
    <div>
      <h1
        style={{
          backgroundColor: isCountGreterThan10 ? 'green' : 'red',
        }}
      >
        {number}
      </h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <div>public Ip: {publicIp}</div>
    </div>
  );
};

export default Test;
