import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'

export default function ScrollLoad(props) {
  const { children, loadMore, hasMore, loading } = props

  return (
    <div>
      <InfiniteScroll
        pageStart={ 0 }
        loadMore={ loadMore }
        hasMore={ hasMore }
        loader={loading && <div key={ 0 } >Loading ...</div>}
      >
        { children }
      </InfiniteScroll>
    </div>
  )
}
