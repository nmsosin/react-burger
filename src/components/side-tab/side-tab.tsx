import SideTabStyles from './side-tab.module.css';
import {FC} from "react";

type TSideTabProps = {
  active: true;
  value: string;
  onClick: () => void;
}

export const SideTab: FC<TSideTabProps> = ({ active, value, onClick}) => {

  return (
    <>
      <div className={SideTabStyles.sideNavButton} onClick={onClick}>
        <span className={ active ? SideTabStyles.active : ''}>{value}</span>
      </div>
    </>
  )
}