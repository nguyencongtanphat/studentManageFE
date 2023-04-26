import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import style from "./BreadCrumb.module.css"

const Breadcrumbs = () => {
  const location = useLocation();

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const name = pathSnippets[index];
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url} style={{ fontSize: "16px" }}>
          {name}
        </Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/" style={{ fontSize: "16px"  }}>
        Home
      </Link>
    </Breadcrumb.Item>,
    ...extraBreadcrumbItems,
  ];

  return (
    <div className={style.BreadCrumbContainer}>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  ); 
  
};

export default Breadcrumbs;
