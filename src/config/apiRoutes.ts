export const apiRoutes = {
    sinIn: '/auth/signin',
    org: '/orgs',
    getCredentialOptions: '/bulk/cred-defs',
    downloadTemplate: '/download',
    bulk:{
        credefList:'/bulk/cred-defs',
        uploadCsv: '/bulk/upload',
        preview: '/preview',
        bulk: '/bulk',
        files: '/bulk/files',
        filesData: '/bulk/file-data',
        retry: '/retry/bulk'
    },

    verification: {
		sendProofRequest: '/proofs',
        verifyProof: '/verify',
        getProofDetails: '/verified-proofs/'
	},

    connection: {
        getConnection: '/connections',
        getShorteningUrl: '/invitation',
        getInvitationUrl: '/receive-invitation-url'
    },
    userProfile: '/users/profile'
}