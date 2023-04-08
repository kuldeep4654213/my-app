const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store'; 
import { favouritesAtom } from '@/store'; 
import { getFavourites } from '@/lib/userData';
import { getHistory } from '@/lib/userData';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';

export default function RouteGuard(props) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.pathname);
    updateAtoms()

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);
  async function updateAtoms(){
    setFavouritesList(await getFavourites()); 
    setSearchHistory(await getHistory()); 
  }
  function authCheck(url) {
    const path = url.split('?')[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push('/login');
    }
      else {
        setAuthorized(true);
      }
  }

  // return <>{props.children}</>
  return <>{authorized && props.children}</>
}