// Module imports
import React from 'react'





// Component imports
import { Link } from '../../../routes'
import ArticleList from '../../../components/ArticleList'
import PageWrapper from '../../../components/PageWrapper'
import requireAuthentication from '../../../components/requireAuthentication'





const BlogDashboard = () => (
  <PageWrapper title="Blog Dashboard">
    <section>
      <header className="page-header">
        <h2>Dashboard / Blog</h2>

        <Link route="new article">
          <a className="button primary">
            New Article
          </a>
        </Link>
      </header>

      <ArticleList
        editMode
        includeDrafts />
    </section>
  </PageWrapper>
)





export default requireAuthentication(BlogDashboard)
