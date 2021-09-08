import React from 'react';

interface IHeaderProps {
  label: string
}

const Header = (props: IHeaderProps) => {
  return (
    <div style={{ color: 'white', textAlign: 'left', fontSize: 24 }}>
      {props.label}
    </div>
  );
}

export default Header;
