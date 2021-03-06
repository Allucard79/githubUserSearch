class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            users: []
        };
        this.onChangeHandle=this.onChangeHandle.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
}

    onChangeHandle(event) {
        this.setState({searchText: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({users: responseJson.items}));
    }

    render() {
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor="searchText">Search by user name: </label>
                <input
                    type="text"
                    id="searchText"
                    onChange={this.onChangeHandle}
                value={this.state.searchText}/>
            </form>
            <UsersList users={this.state.users}/>
        </div>
        );
    }
}

    class UsersList extends React.Component {
        get users() {
            return this.props.users.map(user => <User key={user.id} user={user}/>);
        }

    render() {
        return (
        <div className='users'>
            {this.users}
        </div>
        );
    }
}

    class User extends React.Component {
        render() {
            return (
                <div className='user'>
                    <img className='image' src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
                    <div>
                        <h3>user name: </h3>     
                        <a href={this.props.user.html_url} target='_blank'>{this.props.user.login}</a>
                    </div>
                </div>
            );
        }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);