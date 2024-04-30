export const customPhoneValidator = (value) => {
  if (!/^1[3456789]\d{9}$/.test(value)) {
    throw new Error('手机号不符合规则')
  }
  return true
}
