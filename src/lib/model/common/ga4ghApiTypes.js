import DrsObjectMain from "../../components/ga4gh/drs/drsobject/DrsObjectMain";

const ga4ghApiTypes = {
    drs: {
        'name': 'Data Repository Service',
        'abbreviation': 'DRS',
        'serviceInfoEndpoint': '/ga4gh/drs/v1/service-info',
        'models': [
            {
                label: 'DRS Objects',
                path: 'objects',
                description: 'Provides metadata and indirection for a file, allowing a file to be accessed from multiple locations, and via multiple access methods (e.g. cloud or local storage)',
                componentFunction: (service, trail) => <DrsObjectMain service={service} trail={trail} />
            }
        ]
    }
}

export default ga4ghApiTypes;
