interface NavigationButtonProps {
  label: string
  href: string
  icon: string
  alt: string
}

const NavigationButton = (props: NavigationButtonProps) => {
  return (
    <div style={styles.buttonStyle} onClick={() => window.location.href=props.href}>
      <img src={props.icon} alt={props.alt} style={styles.iconStyle}/>
      {props.label}
    </div>

  );
};

const styles: { [key: string]: React.CSSProperties } = {  
  buttonStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 100,
    cursor: 'pointer',
    textAlign: 'center',
    borderRadius: 8,
  },
  iconStyle: {
    height: '80%'
  }
}

export default NavigationButton;
