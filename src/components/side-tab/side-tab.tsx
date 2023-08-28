import SideTabStyles from './side-tab.module.css';
import {FC, ReactNode} from "react";

type TSideTabProps = {
  active: boolean;
  value: string;
  onClick: () => void;
  children?: ReactNode;
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