// components/TempoDuracaoField.tsx
import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

type TempoDuracaoFieldProps = {
  control: any;
  errors?: any;
  name?: string; // por padrão "tempoDuracao"
};

function formatDigitsToHHMM(digits: string) {
  // mantém só dígitos e no máximo 4
  const onlyDigits = (digits || "").replace(/\D/g, "").slice(0, 4);
  const padded = onlyDigits.padStart(4, "0"); // "0034" -> "00:34"
  const hh = padded.slice(0, 2);
  const mm = padded.slice(2, 4);
  return `${hh}:${mm}`;
}

export function TempoDuracaoField({ control, errors, name = "tempoDuracao" }: TempoDuracaoFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // field.value pode ser undefined ou "HH:MM" já formatado
        const formatted = field.value ? String(field.value).slice(0, 5) : "00:00";

        return (
          <TextField
            label="Tempo de Duração"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formatted}
            onChange={(e) => {
              // Pega só os dígitos do valor que o usuário inseriu
              const input = e.target.value;
              const digits = input.replace(/\D/g, ""); // remove ":" e outros
              const hhmm = formatDigitsToHHMM(digits);

              // envia o valor formatado pro RHF ("HH:MM")
              field.onChange(hhmm);
            }}
            onPaste={(e) => {
              // previne colagem com letras, formata antes de colocar
              e.preventDefault();
              const paste = (e.clipboardData?.getData?.("Text") || "").replace(/\D/g, "");
              const hhmm = formatDigitsToHHMM(paste);
              field.onChange(hhmm);
            }}
            inputProps={{
              inputMode: "numeric",
              maxLength: 5,
              style: { fontVariantNumeric: "tabular-nums" },
            }}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
          />
        );
      }}
    />
  );
}
