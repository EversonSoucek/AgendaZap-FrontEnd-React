import { useState } from "react";
import { ToolbarProps } from "react-big-calendar";
import { Select, MenuItem, FormControl, InputLabel, Button, Box } from "@mui/material";

const CustomToolbar = (props: ToolbarProps) => {
    const { label, onNavigate, onView } = props;
    const [funcionario, setFuncionario] = useState("");

    const getButtonStyles = (view: string) => ({
        backgroundColor: props.view === view ? "#161D30" : "#fff",
        color: props.view === view ? "#fff" : "#000",
        fontFamily: "Poppins, sans-serif",
        textTransform: "none",
        border: "1px solid #000",
        borderRadius: "8px",
        minWidth: 64,
    });

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
            }}
        >
            <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                    value={funcionario}
                    onChange={(e) => setFuncionario(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    sx={{
                        backgroundColor: "#fff",
                        border: "1px solid #000",
                        borderRadius: "8px",
                        "& .MuiSelect-select": {
                            padding: "10px 12px", // mais espaço para o label
                        },
                    }}
                    renderValue={(selected) => {
                        if (!selected) return <em>Todos</em>;
                        if (selected === "1") return "João";
                        if (selected === "2") return "Maria";
                        if (selected === "3") return "Carlos";
                        return "";
                    }}
                >
                    <MenuItem value="">
                        <em>Todos</em>
                    </MenuItem>
                    <MenuItem value="1">João</MenuItem>
                    <MenuItem value="2">Maria</MenuItem>
                    <MenuItem value="3">Carlos</MenuItem>
                </Select>
            </FormControl>

            <div style={{ fontWeight: "bold", fontSize: 16, fontFamily: "Poppins, sans-serif" }}>{label}</div>

            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Setas */}
                <Button
                    onClick={() => onNavigate?.("PREV")}
                    sx={{
                        minWidth: 32,
                        border: "none",
                        color: "#000",
                        fontWeight: "bold",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    {"<"}
                </Button>

                <Box display="flex" ml={1} gap={1}>
                    <Button onClick={() => onView?.("month")} sx={getButtonStyles("month")}>
                        Mês
                    </Button>
                    <Button onClick={() => onView?.("week")} sx={getButtonStyles("week")}>
                        Semana
                    </Button>
                    <Button onClick={() => onView?.("day")} sx={getButtonStyles("day")}>
                        Dia
                    </Button>
                </Box>

                <Button
                    onClick={() => onNavigate?.("NEXT")}
                    sx={{
                        minWidth: 32,
                        border: "none",
                        color: "#000",
                        fontWeight: "bold",
                        fontFamily: "Poppins, sans-serif",
                        ml: 1,
                    }}
                >
                    {">"}
                </Button>
            </div>
        </div>
    );
};

export default CustomToolbar;
