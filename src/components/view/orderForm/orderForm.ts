import {Component} from "../../base/Component.ts";
import {ensureElement} from "../../../utils/utils.ts";

export abstract class OrderForm<T> extends Component<T> {
    protected errorsElement: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);

        this.errorsElement = ensureElement<HTMLElement>('form__errors', this.container);
    }

    public set errors(errors: string[]) {
        let text: string = '';
        if (errors) {
            for (let i = 0; i < errors.length; i++) {
                if (i === 0) {
                    text = errors[i];
                } else {
                    text = text + `, ${errors[i]}`;
                }
            }
        }
        this.errorsElement.textContent = text;
    }
}