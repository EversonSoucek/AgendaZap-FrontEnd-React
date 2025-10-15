import React, { useMemo, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, TextField, Stack, Typography, Box, TablePagination
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export interface Column<T> {
  field: keyof T;
  headerName: string;
  width?: string | number;
  render?: (value: any, row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId?: (row: T) => string | number; // ✅ função opcional para obter id
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchPlaceholder?: string;
  title: string
}

export function GenericTable<T extends Record<string, any>>({
  columns,
  data,
  getRowId,
  onEdit,
  onDelete,
  searchPlaceholder = "Pesquisar...",
  title
}: GenericTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lower)
      )
    );
  }, [data, search]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: 2 }}>
      {/* 🔍 Barra de pesquisa */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{title}</Typography>
        <TextField
          size="small"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      {/* 🧾 Tabela */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col.field)} style={{ width: col.width }}>
                  <strong>{col.headerName}</strong>
                </TableCell>
              ))}
              {(onEdit || onDelete) && <TableCell align="center"><strong>Ações</strong></TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={getRowId ? getRowId(row) : (row.id ?? JSON.stringify(row))}>
                {columns.map((col) => (
                  <TableCell key={String(col.field)}>
                    {col.render ? col.render(row[col.field], row) : row[col.field]}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell align="center">
                    <Stack direction="row" justifyContent="center">
                      {onEdit && (
                        <IconButton color="primary" onClick={() => onEdit(row)}>
                          <Edit />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton color="error" onClick={() => onDelete(row)}>
                          <Delete />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <Box textAlign="center" py={2}>Nenhum registro encontrado.</Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 📄 Paginação */}
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
      />
    </Paper>
  );
}
