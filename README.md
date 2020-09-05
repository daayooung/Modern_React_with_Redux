# useEffect

```
  useEffect(() => {
    effect
    return () => {
      cleanup
    }
  }, [data])
```

<br>

### second argument

- [] : 첫 render 시 실행
- second argument 없음 : 첫 render 시 실행 후 rerender 될 때마다 실행
- [data] : 첫 render 시 실행, [] 안 data의 내용이 바뀔 때 실행
  <br>

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

<br>

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

<br>

해결 2)
해결 1처럼 변수를 설정하는 대신, useEffect 내 비동기 함수를 즉시 실행 함수로 작성한다.

```
  useEffect(() => {
    (async () => {
      await axios.get('some url');
    })();

  }, [term]);
```

<br>

해결 3)
async await 대신 그 전 문법인 promise을 사용한다. axios 요청을 하면 promise를 반환하는데, 이 때 then으로 엮을 수 있다. 해당 api에서 반환되는 응답과 함께 then 뒤의 arrow function 이 호출된다.

```
  useEffect(() => {
    (async () => {
      await axios.get('some url');
    })();

  }, [term]);
```

<br>

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

<br>

> [150강] Async Code in useEffect

# dangerouslySetInnerHTML

api data가 html tag를 포함해 넘어올 때 사용.
XSS 공격을 당해 악의적 data도 함께 노출하게 될 수 있어 사용 시 주의가 필요하다.

```
 <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
```

<br>

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

<br>

> [157강] Throtting API Requests

# API 요청 제한

### 1. useEffact의 두번째 인자에 results.length 할당x

두번째 인자에 results.length를 할당하게 되면, 요청/응답이 2번 일어난다.

### 2. term, debouncedTerm로 state 분리

현재 보여주고 있는 검색결과와 새로 입력한 검색어가 같을 경우 search를 재실행하지 않는다.

그러기 위해 useEffect() 두 개가 필요하다.
하나는 즉시 term을 업데이트 하고, debouncedTerm 업데이트에는 타이머를 설정하고,
하나는 debouncedTerm을 바라보다 상태가 변경되면 데이터를 요청한다.

<br>

#### [ useEffect 1 ]

1. debouncedTerm에 term을 설정한다.
2. setDebouncedTerm(term)에 500ms 의 timer를 걸어 사용자가 검색어를 너무 빠르게 입력할 경우 검색어 입력 과정에서의 setDebouncedTerm(term)은 취소한다.

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

<br>

#### [ useEffect 2 ]

<br>

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

<br>

> [162강] Optional Video - Fixing a Warning

# div / className 활성화

1. const [open, setOpen] = useState(false);
2. item list에 onClick={() => onSelectedChange(option)}
3. 클릭 여부에 따라 활성/비활성화 할 내용에 className={`menu ${open ? 'visible transition' : ''}`}

```
const [open, setOpen] = useState(false);

...

const renderedOptions = options.map((option) => {
  if (option.value === selected.value) {
    return null;
  }

  return (
    <div
      key={option.value}
      className="item"
      onClick={() => onSelectedChange(option)}
    >
      {option.label}
    </div>
  );
});

...

  <div className={`menu ${open ? 'visible transition' : ''}`}>
    {renderedOptions}
  </div>
```

<br>

> [163~168강] Dropdown Architectrue

# Javascript / React event

Javascript와 React로 각각 click event를 걸면, Javascript의 event가 먼저 호출된다.

- Javascript

```
  useEffect(() => {
    document.body.addEventListener('click', () => {
      setOpen(false);
    });
  }, []);
```

<br>

- React

```
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
});

<div
  onClick={() => setOpen(!open)}
  className={`ui selection dropdown ${open ? 'visible active' : ''}
  `}
  >
  <i className="dropdown icon"></i>
  <div className="text">{selected.label}</div>
  <div className={`menu ${open ? 'visible transition' : ''}`}>
    {renderedOptions}
  </div>
</div>

```

<br>

이로 인해 dropdown 내부를 클릭했을 때 내부에 걸어둔 onClick event가 먹지 않는 상황이 발생한다. 이럴 때 해당 list가 속한 Elem을 useRef로 참조하고, 클릭한 곳이 그 ref일 경우 Javascript로 걸어둔 event를 return 시키면 된다.

```
if (ref.current.contains(event.target)) {
  return;
}
```

<br>

useEffect의 clean up function에서 removeEventListener를 해주면, 나중에 App.js에서 toggle로 Dropdown 컴포넌트를 숨겨 ref가 null이 되는 상황이 와도

```
 {showDropdown ? (<Dropdown/>) : null}
```

<br>

null.current.contains(event.target) 을 찾을 수 없다는 error가 발생하지 않는다.

```
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);
```

<br>

> [170~176강] Reminder on Event Bubbing

# Translation App API 요청 최적화

#### [ useEffect 1 ]

1. Set a timer to update 'deboucedText' in 500ms
2. Return a cleanup function that cancels this timer

```
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);
```

<br>

#### [ useEffect 2 ]

1. Make a request with 'debouncedText'

```
  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
          }
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);
```

<br>

> [185강] Debouncing Translation Updates

# Trandtional HTML & React의 페이지 전환

### Trandtional HTML

페이지가 바뀔 때마다 Javascript, CSS를 비롯한 앱을 구성하는 모든 파일들이 reload 됨.

### React

사용자가 NAV를 클릭!

1. URL을 바꾼다. (전체 페이지를 refresh 하지는 않는다.)
2. 각 Route가 URL 변화를 감지한다.
3. Route가 현재의 pathname을 추적해 몇몇 state를 업데이트 한다.
4. 각 Route가 렌더되며 component가 적절하게 보여지거나 숨겨진다.

<br>

> [190강] Handling Navigation

# window.history.pushState({},'','/translate')

url을 바꿀 수 있는 javascript의 기본 기능

<br>

> [190강] Changing the URL

# 새 탭에서 열기

metaKey : Mac 키(command), ctrlKey: Window 키

```
if (event.metaKey || event.ctrlKey) {
  return;
}
```

> [195강] Handling Command Click

# Youtube App hooks로 리팩토링

<br>

```
const onVideoSelect = (video) => {
  setSelectedVideo(video);
};
```

setSelectedVideo에 video를 넣어 실행하는 단순한 함수이므로 inline으로 넣어 깔끔하게 작성할 수 있다.
<br>

```
<VideoList onVideoSelect={(video)=>setSelectedVideo(video)} videos={videos} />
```

video라는 하나의 argument를 받아 함수에 넣어줄 뿐이므로 둘 다 생략할 수 있다.

<br>

```
<VideoList onVideoSelect={setSelectedVideo} videos={videos} />
```
