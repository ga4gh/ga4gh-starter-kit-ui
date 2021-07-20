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
                componentFunction: (service, trail) => <DrsObjectMain service={service} trail={trail} />
            }
        ]
    }
}

export default ga4ghApiTypes;
