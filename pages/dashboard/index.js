// Module imports
import React from 'react'





// Component imports
import ArticleList from '../../components/ArticleList'
// import MovieSearch from '../../components/MovieSearch'
import PageWrapper from '../../components/PageWrapper'
import RequireAuthentication from '../../components/RequireAuthentication'





const Dashboard = () => (
  <PageWrapper title="Dashboard">
    <RequireAuthentication>
      <section>
        <header>
          <h2>Recent Articles</h2>
        </header>

        <ArticleList
          editMode
          includeDraft
          limit={3} />

        {/* <MovieSearch /> */}
      </section>
    </RequireAuthentication>
  </PageWrapper>
)





export default Dashboard
