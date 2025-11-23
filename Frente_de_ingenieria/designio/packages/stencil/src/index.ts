let loadersInitialized = false;

export default async function defineCustomElements() {
  if (loadersInitialized) {
    return;
  }

  try {
    const [sherpaModule, boccModule, bavvModule, bpopModule] =
      await Promise.all([
        import('@npm-bbta/bbog-dig-dt-sherpa-lib/loader'),
        import(
          '@avaldigitallabs/adl-commons-design-system-frontend-bocc-designio/dist/loader'
        ),
        import(
          '@avaldigitallabs/adl-commons-design-system-frontend-bavv-designio/dist/loader'
        ),
        import(
          '@avaldigitallabs/adl-commons-design-system-frontend-bpop-designio/dist/loader'
        )
      ]);

    // Cargar Sherpa primero ya que otros componentes dependen de él
    sherpaModule.defineCustomElements?.();

    // Luego cargar el resto
    boccModule.defineCustomElements?.();
    bavvModule.defineCustomElements?.();
    bpopModule.defineCustomElements?.();

    loadersInitialized = true;
    console.log('External design systems loaded');
  } catch (e) {
    console.warn('Failed to load external design systems, using fallbacks:', e);
  }
}

export * from './components';
