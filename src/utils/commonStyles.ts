import styled from "@emotion/styled";

export const Search = styled.div`
    display: flex;
    flex-direction: row;
    
    .Input {
        flex: 4;

        input {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
        }
    }

    .State {
        flex: 1;

        input {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        }
    }

`;