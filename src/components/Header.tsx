import { useTheme } from '@mui/material/styles';

const Header = () => {
    const theme = useTheme();
    const headerStyle = {
        height: '64px',
        fontSize: theme.typography.h2.fontSize,
        fontWeight:'500',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.50)",
    };
    return (
        <div style={headerStyle}>
            Application
        </div>
    );
};

export default Header;