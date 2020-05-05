import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

type TProps = {
  hasMore: boolean,
  loading: boolean,
  children: JSX.Element,
  loadMore(): void
}

export default function ScrollLoad(props: TProps) {
  const { children, loadMore, hasMore, loading } = props

  return (
    <div>
      <InfiniteScroll
        pageStart={ 0 }
        loadMore={ loadMore }
        hasMore={ hasMore }
        loader={loading && <div key={ 0 } >Loading ...</div>}
        initialLoad={ false }
      >
        { children }
      </InfiniteScroll>
    </div>
  )
}
