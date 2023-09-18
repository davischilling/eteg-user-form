export class CpfValueObject {
  constructor(readonly value: string) {}

  static isValidNumericCPF(cpf: string): boolean {
    // Check if the string has format 000.000.000-00
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!cpfRegex.test(cpf)) {
      return false
    }
    return true
  }

  getCpfDigits(): string {
    return this.value.replace(/\D/g, '')
  }

  formatCpf(): string {
    // Format the CPF
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
