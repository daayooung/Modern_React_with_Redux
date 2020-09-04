# useEffect

```
  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [data])
```

### second argument

- [] : 첫 render 시 실행
- second argument 없음 : 첫 render 시 실행 후 rerender 될 때마다 실행
- [data] : 첫 render 시 실행, [] 안 data의 내용이 바뀔 때 실행

> [146강] The use Effect Hook

### Async Code in useEffect

useEffect 함수는 정리에 사용되는 clean-up 함수 외에는 아무것도 반환하지 않아야 한다.

잘못된 예)
그러므로 코드를 아래와 같이 작성할 수 없으며, 여기에는 세가지 해결 방안이 있다.

```
useEffect(async () => {
  await axios('hi');
}, [term]);
```

해결 1)
useEffect 내에 비동기 함수를 작성하고 즉시 호출한다.

```
  useEffect(() => {
    const search = async () => {
      await axios.get('some url');
    };

    search()
  }, [term]);
```

해결 2)
해결 1처럼 변수를 설정하는 대신, useEffect 내 비동기 함수를 즉시 실행 함수로 작성한다.

```
  useEffect(() => {
    (async () => {
      await axios.get('some url');
    })();

  }, [term]);
```

해결 3)
async await 대신 그 전 문법인 promise을 사용한다. axios 요청을 하면 promise를 반환하는데, 이 때 then으로 엮을 수 있다. 해당 api에서 반환되는 응답과 함께 then 뒤의 arrow function 이 호출된다.

```
  useEffect(() => {
    (async () => {
      await axios.get('some url');
    })();

  }, [term]);
```

> [149강] Async Code in useEffect

axios.get 뒤에 첫번째 인자로 도메인, 두번째 인자로 params를 설정해주면, 두가지가 합쳐져 하나의 완성된
url이 된다.

```
  useEffect(() => {
    const search = async () => {
      await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          oriin: '*',
          format: 'json',
          srsearch: term
        }
      });
    };
```

> [150강] Async Code in useEffect

# dangerouslySetInnerHTML

api data가 html tag를 포함해 넘어올 때 사용.
XSS 공격을 당해 악의적 data도 함께 노출하게 될 수 있어 사용 시 주의가 필요하다.

```
 <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
```

> [153강] XSS Attacks in React

# 검색어 입력과 setTimeout

setTimeout을 걸어두지 않으면 매 타이포마다 Search component가 실행되고 검색결과가 노출이 되므로

1. Search component에 setTimeout 500ms을 걸어둔다.
2. Input value change 될 때마다(검색어가 한 자 한자 타이핑 될 때마다) 그 전의 timer를 취소하고 다시 timer 설정을 한다.
3. 이제 더이상 Input value가 바뀌지 않으면 비로소 500ms짜리 timer가 실행되어 Search component가 실행된다.

```
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });

      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);
```

> [157강] XSS Attacks in React

# 검색결과 요청/응답 한 번만 발생하게 하기

### 1. useEffact의 두번째 인자에 results.length 할당x

두번째 인자에 results.length를 할당하게 되면, 요청/응답이 2번 일어난다.

### 2. term, debouncedTerm로 state 분리

현재 보여주고 있는 검색결과와 새로 입력한 검색어가 같을 경우 search를 재실행하지 않는다.

그러기 위해 useEffect() 두 개가 필요하다.
하나는 즉시 term을 업데이트 하고, debouncedTerm 업데이트에는 타이머를 설정하고,
하나는 debouncedTerm을 바라보다 상태가 변경되면 데이터를 요청한다.

[ useEffect 1 ]

1. debouncedTerm에 term을 설정한다.
2. setDebouncedTerm(term)에 500ms 의 timer를 걸어 사용자가 검색어를 너무 빠르게 입력할 경우 검색어 입력 과정에서의 setDebouncedTerm(term)은 취소된다.

```
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timerId)
    };
  }, [term]);
```

[ useEffect 2 ]

1. search 함수 호출하여 api 요청 / 응답 수행하는데, 이 때 params의 srsearch를 debouncedTerm로 설정한다.
2. setResults에 검색결과를 할당 한다.

```
   useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm
        }
      });

      setResults(data.query.search);
    };
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);
```

> [162강] XSS Attacks in React
