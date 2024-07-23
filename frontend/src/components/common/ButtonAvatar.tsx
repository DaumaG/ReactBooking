import { PropsWithChildren } from "react";
import styles from "./Avatar.module.scss";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Avatar = ({ children }: PropsWithChildren) => {
  return (
    <DropdownButton title={children} className={styles.avatar}>
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    </DropdownButton>
  );
};

export default Avatar;
