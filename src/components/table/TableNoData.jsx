import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell } from '@mui/material';
import EmptyContent from '../empty-content/EmptyContent';
//

// ----------------------------------------------------------------------

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
  title: PropTypes.string,
};

export default function TableNoData({ isNotFound, title }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title="No Data Found"
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
