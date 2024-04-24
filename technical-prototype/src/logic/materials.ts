

export function nameOCWP({organization, cause, worker, person}: {organization: string, cause: string, worker: string, person: string}): string {
  return `./${organization}/${cause}/${worker}-vs-${person}`;
}

export function nameOCW({organization, cause, worker}: {organization: string, cause: string, worker: string}): string {
  return `./${organization}/${cause}/${worker}`;
}
