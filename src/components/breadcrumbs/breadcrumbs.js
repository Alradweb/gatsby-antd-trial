import React from 'react'
import { Location } from '@reach/router';
import { Link  } from "gatsby"
import { Breadcrumb, Icon } from 'antd';
const breadcrumbNameMap = {
  '/articles': 'статьи',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail'
};
const Breadcrumbs = (props) =>{
  console.log('Breadcrumbs--',props.location)
  const pathSnippets = props.location.pathname.split('/').filter(i => i);
  const pathsLength = pathSnippets.length
  const extraBreadcrumbItems = pathSnippets.map((link, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const title =  pathsLength === index + 1 ? props.title : link
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{title}</Link>
      </Breadcrumb.Item>
    );
  });

  console.log(pathSnippets)
  return(
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={'/'}><Icon type="home" /></Link>
      </Breadcrumb.Item>
      {extraBreadcrumbItems}
    </Breadcrumb>
  )
}

export default props => (
  <Location>
    {locationProps => <Breadcrumbs {...locationProps} {...props} />}
  </Location>
)
// const Apps = () => (
//   <ul className="app-list">
//     <li>
//       <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
//     </li>
//     <li>
//       <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
//     </li>
//   </ul>
// );
//
// const Home = ({ routes, params, children }) => (
//   <div className="demo">
//     <div className="demo-nav">
//       <Link to="/">Home</Link>
//       <Link to="/apps">Application List</Link>
//     </div>
//     {children || 'Home Page'}
//     <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
//     <Breadcrumb routes={routes} params={params} />
//   </div>
// );
//
// ReactDOM.render(
//   <Router history={hashHistory}>
//     <Route name="home" breadcrumbName="Home" path="/" component={Home}>
//       <Route name="apps" breadcrumbName="Application List" path="apps" component={Apps}>
//         <Route name="app" breadcrumbName="Application:id" path=":id">
//           <Route name="detail" breadcrumbName="Detail" path="detail" />
//         </Route>
//       </Route>
//     </Route>
//   </Router>,
//   mountNode,
// );