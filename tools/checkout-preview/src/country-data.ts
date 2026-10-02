/**
 * Country data for the countries the playground offers: the subset of fixtures/country-data.ts it
 * needs, plus Europe and the Middle East, which that fixture lacks. Kept under src/ so the
 * api-extractor build (tsconfig.api-v2.json) keeps src as its root.
 */

type CountryEntry = {
  country_name: string
  country_code: string
  prefix_phone: { prefix: string; regex: string }
  icon: string
  icon_url: string
}

const withPrefix = ({
  country_name,
  country_code,
  prefix,
  icon,
}: {
  country_name: string
  country_code: string
  prefix: string
  icon: string
}): CountryEntry => ({
  country_name,
  country_code,
  prefix_phone: { prefix, regex: `^(\\+${prefix}|${prefix})\\d{4,}$` },
  icon,
  icon_url: `https://icons.prod.y.uno/flags/flag-${country_code.toLowerCase()}.png`,
})

export const COUNTRIES: CountryEntry[] = [
  { country_name: 'Brasil', country_code: 'BR', prefix_phone: { prefix: '55', regex: '^(\\+55|55)\\d{4,}$' }, icon: '🇧🇷', icon_url: 'https://icons.prod.y.uno/flags/flag-br.png' },
  { country_name: 'Chile', country_code: 'CL', prefix_phone: { prefix: '56', regex: '^(\\+56|56)\\d{4,}$' }, icon: '🇨🇱', icon_url: 'https://icons.prod.y.uno/flags/flag-cl.png' },
  { country_name: 'Colombia', country_code: 'CO', prefix_phone: { prefix: '57', regex: '^(57|\\+57)3\\d{9}$' }, icon: '🇨🇴', icon_url: 'https://icons.prod.y.uno/flags/flag-co.png' },
  { country_name: 'México', country_code: 'MX', prefix_phone: { prefix: '52', regex: '^(\\+52|52)\\d{4,}$' }, icon: '🇲🇽', icon_url: 'https://icons.prod.y.uno/flags/flag-mx.png' },
  { country_name: 'Perú', country_code: 'PE', prefix_phone: { prefix: '51', regex: '^(\\+51|51)\\d{4,}$' }, icon: '🇵🇪', icon_url: 'https://icons.prod.y.uno/flags/flag-pe.png' },
  { country_name: 'Estados Unidos', country_code: 'US', prefix_phone: { prefix: '1', regex: '^(\\+1|1)\\d{4,}$' }, icon: '🇺🇸', icon_url: 'https://icons.prod.y.uno/flags/flag-us.png' },
  withPrefix({ country_name: 'Spain', country_code: 'ES', prefix: '34', icon: '🇪🇸' }),
  withPrefix({ country_name: 'Portugal', country_code: 'PT', prefix: '351', icon: '🇵🇹' }),
  withPrefix({ country_name: 'Germany', country_code: 'DE', prefix: '49', icon: '🇩🇪' }),
  withPrefix({ country_name: 'United Kingdom', country_code: 'GB', prefix: '44', icon: '🇬🇧' }),
  withPrefix({ country_name: 'Poland', country_code: 'PL', prefix: '48', icon: '🇵🇱' }),
  withPrefix({ country_name: 'United Arab Emirates', country_code: 'AE', prefix: '971', icon: '🇦🇪' }),
  withPrefix({ country_name: 'Saudi Arabia', country_code: 'SA', prefix: '966', icon: '🇸🇦' }),
  withPrefix({ country_name: 'Kuwait', country_code: 'KW', prefix: '965', icon: '🇰🇼' }),
]

export const DOCUMENT_TYPES: { country: string; code: string; description: string; regex: string }[] = [
  { country: 'PE', code: 'DNI', description: 'Documento Nacional de Identidad', regex: '^[0-9]{8}$' },
  { country: 'PE', code: 'CE', description: 'Carnet de Extranjería', regex: '^[0-9]{10,11}$' },
  { country: 'PE', code: 'RUC', description: 'Registro Único de Contribuyentes', regex: '^[0-9]{11}$' },
  { country: 'MX', code: 'IFE', description: 'Credencial Instituto Federal Electoral', regex: '^\\d{10,18}$' },
  { country: 'MX', code: 'PAS', description: 'Pasaporte', regex: '^[a-zA-Z0-9]{6,9}$' },
  { country: 'MX', code: 'RFC', description: 'Registro Federal de Contribuyente', regex: '^[a-zA-Z]{3,4}[0-9]{6}' },
  { country: 'MX', code: 'CURP', description: 'Clave Única de Registro de Población', regex: '^([A-Z][AEIOUX][A-Z]{2}\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\\d])(\\d)$' },
  { country: 'BR', code: 'CPF', description: 'Cadastro de Pessoas Físicas', regex: '^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}|\\d{11}$' },
  { country: 'BR', code: 'CNPJ', description: 'Cadastro Nacional da Pessoa Jurídica', regex: '^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}|\\d{14}$' },
  { country: 'CO', code: 'CC', description: 'Cédula de Ciudadanía', regex: '^[0-9]{6,10}$' },
  { country: 'CO', code: 'CE', description: 'Cédula de Extranjería', regex: '^[0-9]{6,7}$' },
  { country: 'CO', code: 'NIT', description: 'Número de Identificación Tributaria', regex: '^\\d{8,15}$' },
  { country: 'CO', code: 'PAS', description: 'Pasaporte', regex: '^[a-zA-Z0-9]{6,9}$' },
  { country: 'US', code: 'PP', description: 'Passport', regex: '^[a-zA-Z0-9]{6,9}$' },
  { country: 'US', code: 'DL', description: 'Driver\'s License', regex: '^[0-9a-zA-Z]{4,9}$' },
  { country: 'CL', code: 'CI', description: 'Cédula de Identidad', regex: '^[0-9]{1,2}\\.?[0-9]{3}\\.?[0-9]{3}-?[0-9kK]$' },
  { country: 'CL', code: 'RUT', description: 'Rol Único Tributario', regex: '^[0-9]{1,2}\\.?[0-9]{3}\\.?[0-9]{3}-?[0-9kK]$' },
  { country: 'CL', code: 'RUN', description: 'Rol Único Nacional', regex: '^[0-9]{9}$' },
  { country: 'CL', code: 'PAS', description: 'Pasaporte', regex: '^[a-zA-Z0-9]{6,9}$' },
]

// Every legal link in the checkout (the footer "Privacy" uses payment_data_privacy_policy)
export const LINKS = {
  payment_terms_and_conditions: 'https://www.y.uno/privacy',
  payment_privacy: 'https://www.y.uno/privacy',
  payment_data_privacy_policy: 'https://www.y.uno/privacy',
}
