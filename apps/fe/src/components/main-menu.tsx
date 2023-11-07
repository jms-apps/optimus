import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, MenuItem, Menu } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

enum MENU_LIST {
  ProfileMenu = 'profile-menu',
  InventoryMenu = 'inventory-menu',
}

enum MENU_BUTTON_LIST {
  ProfileButton = 'profile-button',
  InventoryButton = 'inventory-button',
}

interface MenuState {
  anchorEl?: HTMLElement;
  menuOpen?: MENU_LIST;
}

export function MainMenu() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuState>({});

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    menuOpen: MENU_LIST
  ) => {
    setMenu({ anchorEl: event.currentTarget, menuOpen });
  };
  const handleClose = () => {
    setMenu({});
  };
  const addInventory = () => {
    handleClose();
    navigate('/add-inventory');
  };
  const viewInventory = () => {
    handleClose();
    navigate('/my-inventory');
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="fixed h-full p-4 flex flex-col bg-slate-200">
      <div className="text-center pb-4">Menu</div>
      <div className="pb-4">
        <Button
          variant="outlined"
          id={MENU_BUTTON_LIST.ProfileButton}
          aria-controls={
            menu.menuOpen === MENU_LIST.ProfileMenu
              ? MENU_LIST.ProfileMenu
              : undefined
          }
          aria-haspopup="true"
          aria-expanded={
            menu.menuOpen === MENU_LIST.ProfileMenu ? 'true' : undefined
          }
          onClick={(event) => handleClick(event, MENU_LIST.ProfileMenu)}
        >
          <AccountCircleIcon />
        </Button>
        <Menu
          id={MENU_LIST.ProfileMenu}
          anchorEl={menu.anchorEl}
          open={menu.menuOpen === MENU_LIST.ProfileMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': MENU_BUTTON_LIST.ProfileButton,
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
      <div>
        <Button
          variant="outlined"
          id={MENU_BUTTON_LIST.InventoryButton}
          aria-controls={
            menu.menuOpen === MENU_LIST.InventoryMenu
              ? MENU_LIST.InventoryMenu
              : undefined
          }
          aria-haspopup="true"
          aria-expanded={
            menu.menuOpen === MENU_LIST.InventoryMenu ? 'true' : undefined
          }
          onClick={(event) => handleClick(event, MENU_LIST.InventoryMenu)}
        >
          <InventoryIcon />
        </Button>
        <Menu
          id={MENU_LIST.InventoryMenu}
          anchorEl={menu.anchorEl}
          open={menu.menuOpen === MENU_LIST.InventoryMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': MENU_BUTTON_LIST.InventoryButton,
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={addInventory}>Add Inventory</MenuItem>
          <MenuItem onClick={viewInventory}>View Inventory</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
