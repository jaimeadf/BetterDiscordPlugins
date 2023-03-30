import { useStateFromStores } from './hooks/useStateFromStores';

const { Webpack } = BdApi;
const { Filters } = Webpack;

const UserStore = Webpack.getModule(Filters.byProps('getCurrentUser'));
const RelationshipStore = Webpack.getModule(Filters.byProps('isBlocked'));

export function withSelfHidden(ReactorsComponent) {
    return props => {
        const currentUser = useStateFromStores([UserStore], () => UserStore.getCurrentUser());
        const filteredUsers = props.users.filter(user => user.id != currentUser.id)

        return (
            <ReactorsComponent
                {...props}
                users={filteredUsers}
            />
        );
    };
}

export function withBotsHidden(ReactorsComponent) {
    return props => {
        const filteredUsers = props.users.filter(user => !user.bot);

        return (
            <ReactorsComponent
                {...props}
                users={filteredUsers}
            />
        );
    };
}

export function withBlockedHidden(ReactorsComponent) {
    return props => {
        const filteredUsers = useStateFromStores(
            [RelationshipStore],
            () => props.users.filter(user => !RelationshipStore.isBlocked(user.id))
        );

        return (
            <ReactorsComponent
                {...props}
                users={filteredUsers}
            />
        );
    };
}

