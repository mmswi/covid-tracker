import './TableCellNavigation.scss';
import { Link } from 'react-router-dom';

const TableCellNavigation = (props: any) => {
  const { render, condition, href } = props;

  return (condition
    ? <Link to={href}>{render()}</Link> : render()
  );
};

export default TableCellNavigation;
