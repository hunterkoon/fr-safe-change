import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input-common',
  standalone: true,
  imports: [NgxMaskDirective, CommonModule],
  templateUrl: './input-common.component.html',
  styleUrl: './input-common.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCommonComponent),
      multi: true,
    },
  ],
})
export class InputCommonComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() classD: any = null;
  @Input() deactivated: boolean = false;

  value: string = '';
  isDisabled = false;
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  get isClassDynamic(): boolean {
    return this.classD != null;
  }
}
