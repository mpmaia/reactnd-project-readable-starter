import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "material-ui";
import {Link} from "react-router-dom";

export class PostNotFound extends React.Component {

    render() {
        return (
            <Card>
                <CardHeader
                    title={"Post not found"}
                />
                <CardContent>
                    <Typography component="p">
                        The requested post was not found. It was probably removed.
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button dense color="primary">
                        <Link to="/">Go Back</Link>
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default PostNotFound;