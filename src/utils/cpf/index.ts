export const formatCPF = (cpf: string): string => {
    const cleanedCPF = cpf.replace(/\D/g, "");
  
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    const maskedCPF = cleanedCPF.replace(cpfRegex, "$1.$2.$3-$4");
  
    return maskedCPF;
  };
  
  export const validateCPF = (cpf: string): boolean => {
    const cleanedCPF = cpf.replace(/\D/g, "");
  
    if (cleanedCPF.length !== 11) {
      return false;
    }
  
    if (/^(\d)\1+$/.test(cleanedCPF)) {
      return false;
    }
  
    let sum = 0;
    let remainder: number;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF[i - 1]) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCPF[9])) {
      return false;
    }
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF[i - 1]) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cleanedCPF[10])) {
      return false;
    }
  
    return true;
  };
  