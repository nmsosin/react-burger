import SideTabStyles from './side-tab.module.css';

export const SideTab = ({ active, value, onClick}) => {

  return (
    <>
      <div className={SideTabStyles.sideNavButton} onClick={onClick}>
        <span className={ active ? SideTabStyles.active : null}>{value}</span>
      </div>
    </>
  )
}