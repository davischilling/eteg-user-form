export class CpfValueObject {
  readonly value: string
  constructor(value?: string) {
    // Remove all non-numeric characters
    this.value = value ? value.replace(/\D/g, '') : ''
  }

  static isValidNumericCPF(cpf: string): boolean {
    // Check if the string contains only numeric digits
    return /^[0-9]+$/.test(cpf)
  }

  formatCpf(): string {
    // Format the CPF
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
