import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

// sample data used for testing from Phenopacket test dataset
const mockDrsObjectsList = [
    {
        "id": "b8cd0667-2c33-4c9f-967b-161b905932c9",
        "description": "Open dataset of 384 phenopackets",
        "created_time": "2021-03-12T20:00:00Z",
        "name": "phenopackets.test.dataset",
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "a1dd4ae2-8d26-43b0-a199-342b64c7dff6",
        "description": "Synthetic Phenopacket dataset: Cao family",
        "created_time": "2021-03-12T20:00:00Z",
        "name": "phenopackets.cao.family",
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "1a570e4e-2489-4218-9333-f65549495872",
        "description": "Phenopackets, Cao family, Patient 1",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.cao.1",
        "size": 4257,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "4d83ba3f-a476-4c7c-868f-3d1fcf77fe29",
        "description": "Phenopackets, Cao family, Patient 2",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.cao.2",
        "size": 7401,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "924901d5-6d31-4c33-b443-7931eadfac4b",
        "description": "Phenopackets, Cao family, Patient 3",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.cao.3",
        "size": 4251,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "0f8abce3-e161-4bdf-981f-86257d505d69",
        "description": "Phenopackets, Cao family, Patient 4",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.cao.4",
        "size": 9264,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "c69a3d6c-4a28-4b7c-b215-0782f8d62429",
        "description": "Synthetic Phenopacket dataset: Lalani family",
        "created_time": "2021-03-12T20:00:00Z",
        "name": "phenopackets.lalani.family",
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "456e9ee0-5b60-4f38-82b5-83ba5d338038",
        "description": "Phenopackets, Lalani family, Patient 1",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.lalani.1",
        "size": 11606,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "1af6b862-7fc8-411a-86c5-d8e280e5b77a",
        "description": "Phenopackets, Lalani family, Patient 2",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.lalani.2",
        "size": 17531,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "c37b37fd-0450-432d-b6aa-9ffdece35ad0",
        "description": "Phenopackets, Lalani family, Patient 4",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.lalani.4",
        "size": 9827,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "0bb9d297-2710-48f6-ab4d-80d5eb0c9eaa",
        "description": "Phenopackets, Lalani family, Patient 5",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.lalani.5",
        "size": 12111,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "a3bb76d7-76ae-414b-81f7-97e663b02206",
        "description": "Phenopackets, Lalani family, Patient 6",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.lalani.6",
        "size": 10316,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "1af5cdcf-898c-4dbc-944e-1ac95e82c0ea",
        "description": "Synthetic Phenopacket dataset: Mundhofir family",
        "created_time": "2021-03-12T20:00:00Z",
        "name": "phenopackets.mundhofir.family",
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "2506f0e1-29e4-4132-9b37-f7452dc8a89b",
        "description": "Phenopackets, Mundhofir family, Patient 1",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.mundhofir.1",
        "size": 7002,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "c00c264a-8f17-471f-8ded-1a1f10e965ac",
        "description": "Phenopackets, Mundhofir family, Patient 2",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.mundhofir.2",
        "size": 7634,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "355a74bd-6571-4d4a-8602-a9989936717f",
        "description": "Synthetic Phenopacket dataset: Zhang family",
        "created_time": "2021-03-12T20:00:00Z",
        "name": "phenopackets.zhang.family",
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "697907bf-d5bd-433e-aac2-1747f1faf366",
        "description": "Phenopackets, Zhang family, 2009, proband",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.zhang.2009.proband",
        "size": 6471,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "3a45fab2-f350-445d-a137-4b1f946bf184",
        "description": "Phenopackets, Zhang family, 2011, Patient 2",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.zhang.2011.2",
        "size": 4001,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "ac53ca59-46f3-4f61-b1e7-bb75a49bfbfe",
        "description": "Phenopackets, Zhang family, 2016, Patient 1",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.zhang.2016.1",
        "size": 4709,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "1275f896-4c8f-47e1-99a1-873a6b2ef5fb",
        "description": "Phenopackets, Zhang family, 2017, Patient 1",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.zhang.2017.1",
        "size": 7555,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "8f40acc0-0c54-45c5-8c85-a6f5fb32a1a7",
        "description": "Phenopackets, Zhang family, 2017, Patient 2",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.zhang.2017.2",
        "size": 7114,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "41898242-62a9-4129-9a2c-5a4e8f5f0afb",
        "description": "Phenopackets, Zhang family, 2017, Patient 3",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.zhang.2017.3",
        "size": 6262,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    },
    {
        "id": "6b994f18-6189-4233-bb83-139686490d68",
        "description": "Phenopackets, Zhang family, 2017, Patient 4",
        "created_time": "2021-03-12T20:00:00Z",
        "mime_type": "application/json",
        "name": "phenopackets.zhang.2017.4",
        "size": 6289,
        "updated_time": "2021-03-13T12:30:45Z",
        "version": "1.0.0"
    }
]

const mockBundleDrsObject = {
    "id": "a1dd4ae2-8d26-43b0-a199-342b64c7dff6",
    "description": "Synthetic Phenopacket dataset: Cao family",
    "created_time": "2021-03-12T20:00:00Z",
    "name": "phenopackets.cao.family",
    "updated_time": "2021-03-13T12:30:45Z",
    "version": "1.0.0",
    "is_bundle": true,
    "drs_object_children": [
        {
            "id": "0f8abce3-e161-4bdf-981f-86257d505d69",
            "description": "Phenopackets, Cao family, Patient 4",
            "created_time": "2021-03-12T20:00:00Z",
            "mime_type": "application/json",
            "name": "phenopackets.cao.4",
            "size": 9264,
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": false
        },
        {
            "id": "1a570e4e-2489-4218-9333-f65549495872",
            "description": "Phenopackets, Cao family, Patient 1",
            "created_time": "2021-03-12T20:00:00Z",
            "mime_type": "application/json",
            "name": "phenopackets.cao.1",
            "size": 4257,
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": false
        },
        {
            "id": "4d83ba3f-a476-4c7c-868f-3d1fcf77fe29",
            "description": "Phenopackets, Cao family, Patient 2",
            "created_time": "2021-03-12T20:00:00Z",
            "mime_type": "application/json",
            "name": "phenopackets.cao.2",
            "size": 7401,
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": false
        },
        {
            "id": "924901d5-6d31-4c33-b443-7931eadfac4b",
            "description": "Phenopackets, Cao family, Patient 3",
            "created_time": "2021-03-12T20:00:00Z",
            "mime_type": "application/json",
            "name": "phenopackets.cao.3",
            "size": 4251,
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": false
        }
    ],
    "drs_object_parents": [
        {
            "id": "b8cd0667-2c33-4c9f-967b-161b905932c9",
            "description": "Open dataset of 384 phenopackets",
            "created_time": "2021-03-12T20:00:00Z",
            "name": "phenopackets.test.dataset",
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": true
        }
    ]
}

const mockBlobDrsObject = {
    "id": "1a570e4e-2489-4218-9333-f65549495872",
    "description": "Phenopackets, Cao family, Patient 1",
    "created_time": "2021-03-12T20:00:00Z",
    "mime_type": "application/json",
    "name": "phenopackets.cao.1",
    "size": 4257,
    "updated_time": "2021-03-13T12:30:45Z",
    "version": "1.0.0",
    "aliases": [
        "Cao-FBN1-1"
    ],
    "checksums": [
        {
            "checksum": "f81ea43c74824cc72c77a39a92bf7b71",
            "type": "md5"
        },
        {
            "checksum": "34880a6b8aa517a6999da912614753ffb0a837a8",
            "type": "sha1"
        },
        {
            "checksum": "ec44e2ad7ec84c7c42ba57b205e67c7c7416ae1932029d8364cc053cef7abe58",
            "type": "sha256"
        }
    ],
    "is_bundle": false,
    "drs_object_parents": [
        {
            "id": "a1dd4ae2-8d26-43b0-a199-342b64c7dff6",
            "description": "Synthetic Phenopacket dataset: Cao family",
            "created_time": "2021-03-12T20:00:00Z",
            "name": "phenopackets.cao.family",
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": true
        }
    ],
    "file_access_objects": [
        {
            "path": "./src/test/resources/data/phenopackets/Cao-2018-FBN1-Patient_1.json"
        }
    ],
    "aws_s3_access_objects": [
        {
            "region": "us-east-2",
            "bucket": "ga4gh-demo-data",
            "key": "/phenopackets/Cao-2018-FBN1-Patient_1.json"
        }
    ]
}

export {
    mockDrsObjectsList,
    mockBundleDrsObject,
    mockBlobDrsObject
};