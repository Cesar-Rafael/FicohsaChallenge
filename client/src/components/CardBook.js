import {
  Box,
  Grid,
  Card,
  Typography,
  Divider,
  useTheme,
  styled,
  Button,
} from "@mui/material";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = styled(Button)(
  ({ theme }) => `
    padding: ${theme.spacing(2, 3)};
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    &:hover {
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.alpha.black[100]};
    }
  `
);

const CardBook = ({ book }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <Box display="flex" alignItems="center" p={2}>
          <MenuBookIcon />
          <Box pl={2}>
            <Typography
              sx={{
                pb: 1,
                fontSize: `${theme.typography.pxToRem(16)}`,
              }}
              variant="h4"
            >
              {book.title}
            </Typography>
            <Typography variant="subtitle1">Autor(es):</Typography>
            <Typography variant="subtitle2">
              {book.author_name.map((author, idx) => (
                <span key={idx}>{author}</span>
              ))}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <ButtonWrapper
          fullWidth
          endIcon={<ChevronRightTwoToneIcon />}
          onClick={() => {
            const keys = book.key.split("/");
            navigate(`/items/${keys[2]}`);
          }}
        >
          Ver Detalle
        </ButtonWrapper>
      </Card>
    </Grid>
  );
};

export default CardBook;
