function b(b) {
    $mdDialog.show({
        templateUrl: 'templates/sessionDetailsModal.html',
        controller: 'SessionDetailsController',
        locals: {
            sessionData: b,
        },
    });
}

export const sessionDetailsModal = {
    open: b,
};
