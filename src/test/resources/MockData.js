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

const mockValidTestBlob = {
    "id": "05a33b44-17ff-47d0-a49e-e29ccd78791d",
    "description": "This is a new DRS Object for testing",
    "created_time": "2021-08-10T13:20:00Z",
    "mime_type": "application/json",
    "name": "New DRS Object",
    "size": 100,
    "updated_time": "2021-08-10T13:20:00Z",
    "version": "1.0.0",
    "aliases": [
        "NewDrsAlias"
    ],
    "checksums": [
        {
            "checksum": "1234",
            "type": "md5"
        },
        {
            "checksum": "5678",
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
            "is_bundle": true, 
            "isValid": true
        }
    ],
    "file_access_objects": [
        {
            "path": "path/test-blob"
        }
    ],
    "aws_s3_access_objects": [
        {
            "region": "test-region",
            "bucket": "test-bucket",
            "key": "test-key"
        }
    ]
}

const mockValidTestBundle = {
    "id": "a29cddfc-dfb1-460d-b541-96c053642a43",
    "description": "This is a new DRS Object for testing",
    "created_time": "2021-08-10T18:56:00Z",
    "name": "New DRS Object Bundle",
    "updated_time": "2021-08-10T18:56:00Z",
    "version": "1.0.0",
    "aliases": [
        "NewDrsBundleAlias"
    ],
    "is_bundle": true,
    "drs_object_children": [
        {
            "id": "1a570e4e-2489-4218-9333-f65549495872",
            "description": "Phenopackets, Cao family, Patient 1",
            "created_time": "2021-03-12T20:00:00Z",
            "mime_type": "application/json",
            "name": "phenopackets.cao.1",
            "size": 4257,
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": false, 
            "isValid": true
        }
    ],
    "drs_object_parents": [
        {
            "id": "a1dd4ae2-8d26-43b0-a199-342b64c7dff6",
            "description": "Synthetic Phenopacket dataset: Cao family",
            "created_time": "2021-03-12T20:00:00Z",
            "name": "phenopackets.cao.family",
            "updated_time": "2021-03-13T12:30:45Z",
            "version": "1.0.0",
            "is_bundle": true, 
            "isValid": true
        }
    ]
}

const mockEditableTestBlob = {
    "id": "0f49a385-87af-40b5-8738-3217c3002c31",
    "created_time": "2021-08-11T12:18:00Z",
    "updated_time": "2021-08-11T12:18:00Z",
    "is_bundle": false
}

const mockEditableTestBundle = {
    "id": "3fbc053c-087a-4ad1-b265-ba034520039f",
    "description": "This is a DRS Object for editing",
    "created_time": "2021-08-11T12:18:00Z",
    "updated_time": "2021-08-11T12:18:00Z",
    "is_bundle": true
}

const mockDrsServiceInfo = {
    id: "org.ga4gh.starterkit.drs",
    name: "GA4GH Starter Kit DRS Service",
    description: "An open source, community-driven implementation of the GA4GH Data Repository Service (DRS) API specification.",
    contactUrl: "mailto:info@ga4gh.org",
    documentationUrl: "https://github.com/ga4gh/ga4gh-starter-kit-drs",
    createdAt: "2020-01-15T12:00:00Z",
    updatedAt: "2020-01-15T12:00:00Z",
    environment: "test",
    version: "0.1.0",
    type: {
        group: "org.ga4gh",
        artifact: "drs",
        version: "1.1.0"
    },
    organization: {
        name: "Global Alliance for Genomics and Health",
        url: "https://ga4gh.org"
    }
}

const mockDrsServiceConfig = {
    serviceType: 'drs',
    publicURL: 'http://localhost:4500',
    adminURL: 'http://localhost:8080'
}

const mockDrsObjectMainTrail = [
    {to: "/home", label: "starter-kit"},
    {to: "/services", label: "services"},
    {to: "/services/org.ga4gh.starterkit.drs", label: "org.ga4gh.starterkit.drs"},
    {noLink: true, label: "drs"},
    {to: "/services/org.ga4gh.starterkit.drs/drs/objects", label: "objects"}
]

const mockHomepageTrail = [
    {to: "/home", label: "starter-kit"}
]

export {
    mockDrsObjectsList,
    mockBundleDrsObject,
    mockBlobDrsObject, 
    mockValidTestBlob, 
    mockValidTestBundle, 
    mockEditableTestBlob, 
    mockEditableTestBundle,
    mockDrsServiceInfo,
    mockDrsServiceConfig,
    mockDrsObjectMainTrail,
    mockHomepageTrail
};