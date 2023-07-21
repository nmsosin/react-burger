import SideTabStyles from './side-tab.module.css';

export const SideTab = ({ active, value, onClick}) => {

  return (
    <>
      <div className={`SideTabStyles.sideNavButton ${active ? 'active' : null}`} onClick={onClick}>
        <span>{value}</span>
      </div>
    </>
  )
}