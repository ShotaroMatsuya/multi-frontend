import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  // this history object is the history object that is currently being used inside of our container.
  // in this case , it is a copy of a browser history.
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // Marketingのリンクを押下したときに実行される
      // Marketing内のmemory historyを更新したのち、(勝手にupdateしてくれる)
      // onNavigateを実行して、containerに現在のパスが変わったことを伝える
      // listenで呼び出されることで、引数にhistoryオブジェクトを自動的に渡してくれる
      onNavigate: ({ pathname: nextPathname }) => {
        // this is going to be the path that we are currently at inside of our container at.(To prevent infinite loop)
        const { pathname } = history.location; // old browser history
        if (pathname !== nextPathname) {
          // update browser history to url from marketing app inside the container
          history.push(nextPathname);
        }
      },
    });
    // container detected history object changed , then execute onParentNavigate
    history.listen(onParentNavigate);
    // only try to run this function when our marketing app component is first rendered to the screen.
  }, []);

  return <div ref={ref} />;
};
