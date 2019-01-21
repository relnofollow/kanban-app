import React from 'react';
import classnames from 'classnames';

/* 
<Editable
  editing={editing}
  value={task}
  onEdit={onEdit.bind(null, id)}
  ...props /> 
*/

export default ({editing, value, className, onEdit, ...props}) => {
    if (editing) {
        return <Edit {...{value, className, onEdit}} />;
    }

    return <span className={classnames('value', className)}>{value}</span>
}

/*
<Edit
    value={value}
    onEdit={onEdit}
    className={className}
    {...props}/>
 */

class Edit extends React.Component {
    render() {
        const { value, className } = this.props;
        return (
            <input
                type="text"
                className={classnames('edit', className)}
                autoFocus={true}
                defaultValue={value}
                onBlur={this.finishEdit}
                onKeyPress={this.checkEnter}
            />
        );
    }

    checkEnter = (e) => {
        if (e.key === 'Enter') {
            this.finishEdit(e);
        }
    }

    finishEdit = (e) => 
        this.props.onEdit(e.target.value, e);
}